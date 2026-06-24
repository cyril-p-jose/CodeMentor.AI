// Codementor Application Logic

// State Management
const STATE = {
  apiKey: localStorage.getItem('gemini_api_key') || 'AQ.Ab8RN6Im4bfOSsjBHmggStvpE26UMzxXHL5_yV0jP9gSsHBbqQ',
  currentLanguage: 'python', // default view language
  currentData: null,         // currently loaded question data
  history: JSON.parse(localStorage.getItem('codementor_history')) || [
    { query: 'Two Sum', date: new Date().toISOString() },
    { query: 'Fibonacci Sequence', date: new Date().toISOString() },
    { query: 'Bubble Sort', date: new Date().toISOString() }
  ]
};

// UI Elements
const els = {
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  shimmerWrapper: document.getElementById('shimmer-wrapper'),
  outputBoard: document.getElementById('output-board'),
  compareMatrix: document.getElementById('compare-matrix-card'),
  welcomeContainer: document.getElementById('welcome-container'),
  historyList: document.getElementById('history-list'),
  statusDot: document.getElementById('status-dot'),
  statusText: document.getElementById('status-text'),
  codeDisplay: document.getElementById('code-display'),
  algorithmExplanation: document.getElementById('algorithm-explanation'),
  expectedOutput: document.getElementById('expected-output'),
  timeComplexity: document.getElementById('time-complexity'),
  spaceComplexity: document.getElementById('space-complexity'),
  compareTableBody: document.getElementById('compare-table-body'),
  terminalPanel: document.getElementById('terminal-panel'),
  terminalBody: document.getElementById('terminal-body'),
  btnRunJs: document.getElementById('btn-run-js'),
  
  // Settings Modal
  settingsModal: document.getElementById('settings-modal'),
  openSettingsBtn: document.getElementById('open-settings-btn'),
  closeSettingsBtn: document.getElementById('close-settings-btn'),
  saveSettingsBtn: document.getElementById('save-settings-btn'),
  clearKeyBtn: document.getElementById('clear-key-btn'),
  geminiApiKeyInput: document.getElementById('gemini-api-key')
};

// ---------------------------------------------------------------------
// Curated Demo Database (Fallback & Quick Load)
// ---------------------------------------------------------------------
const DEMO_DB = {
  'two sum': {
    explanation: 'The Two Sum problem can be solved efficiently using a Hash Map (or Dictionary). By storing each number and its index as we iterate through the list, we can check if the target complement (target - current_value) already exists in our map. This reduces the search time from a naive O(N²) nested loop to a single pass O(N) lookup.',
    python: `def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Finds two indices in nums that sum to target.
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    lookup = {}
    for index, val in enumerate(nums):
        complement = target - val
        if complement in lookup:
            return [lookup[complement], index]
        lookup[val] = index
    return []

# Driver Execution
if __name__ == '__main__':
    test_nums = [2, 7, 11, 15]
    test_target = 9
    result = two_sum(test_nums, test_target)
    print(f"Indices that sum to {test_target}: {result}")`,
    c: `#include <stdio.h>
#include <stdlib.h>

// Note: Return array must be malloced. Size returned via returnSize pointer.
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    
    // C implementation uses a simple nested loop as standard hashing is not built-in.
    // An advanced solution would write a separate hash table implementation.
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    *returnSize = 0;
    free(result);
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    int* indices = twoSum(nums, 4, target, &returnSize);
    
    if (indices != NULL) {
        printf("Indices: [%d, %d]\\n", indices[0], indices[1]);
        free(indices);
    } else {
        printf("No solution found.\\n");
    }
    return 0;
}`,
    java: `import java.util.HashMap;
import java.util.Arrays;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        // Storing value -> index mapping
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {}; // Return empty array if not found
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSum(nums, target);
        System.out.println("Indices: " + Arrays.toString(result));
    }
}`,
    javascript: `/**
 * Solves the Two Sum problem using an ES6 Map.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Sandbox execution test
console.log("Running Two Sum Execution...");
const nums = [2, 7, 11, 15];
const target = 9;
console.log("Input Array: " + JSON.stringify(nums));
console.log("Target Sum: " + target);
const indices = twoSum(nums, target);
console.log("Result indices: " + JSON.stringify(indices));`,
    analysis: {
      python: { time: 'O(N)', space: 'O(N)', features: 'Dictionary key lookup, enumerate generator' },
      c: { time: 'O(N²)', space: 'O(1)', features: 'Double nested loops, manual heap memory (malloc)' },
      java: { time: 'O(N)', space: 'O(N)', features: 'HashMap collection, static method utility' },
      javascript: { time: 'O(N)', space: 'O(N)', features: 'ES6 Map object, dynamic array output' }
    }
  },
  'fibonacci sequence': {
    explanation: 'The Fibonacci Sequence can be computed recursively, iteratively, or via dynamic programming. The iterative (tabulation) method is preferred for performance because it runs in O(N) time with O(1) auxiliary space, bypassing the O(2^N) call stack overhead of naive recursion.',
    python: `def fibonacci(n: int) -> list[int]:
    """
    Generates Fibonacci sequence up to N terms.
    Time Complexity: O(N)
    Space Complexity: O(N) to store output
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq

# Driver Execution
if __name__ == '__main__':
    terms = 10
    print(f"Fibonacci first {terms} terms: {fibonacci(terms)}")`,
    c: `#include <stdio.h>
#include <stdlib.h>

void printFibonacci(int n) {
    if (n <= 0) return;
    
    long long first = 0, second = 1, next;
    
    printf("Fibonacci Sequence: ");
    for (int i = 0; i < n; i++) {
        if (i <= 1) {
            next = i;
        } else {
            next = first + second;
            first = second;
            second = next;
        }
        printf("%lld ", next);
    }
    printf("\\n");
}

int main() {
    int terms = 10;
    printFibonacci(terms);
    return 0;
}`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Fibonacci {
    public static List<Long> generateFibonacci(int n) {
        List<Long> sequence = new ArrayList<>();
        if (n <= 0) return sequence;
        
        sequence.add(0L);
        if (n == 1) return sequence;
        
        sequence.add(1L);
        for (int i = 2; i < n; i++) {
            sequence.add(sequence.get(i - 1) + sequence.get(i - 2));
        }
        return sequence;
    }

    public static void main(String[] args) {
        int terms = 10;
        System.out.println("Fibonacci first " + terms + " terms: " + generateFibonacci(terms));
    }
}`,
    javascript: `/**
 * Generates Fibonacci sequence up to N elements.
 * @param {number} n
 * @return {number[]}
 */
function fibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    
    const seq = [0, 1];
    for (let i = 2; i < n; i++) {
        seq.push(seq[i - 1] + seq[i - 2]);
    }
    return seq;
}

// Sandbox execution test
console.log("Running Fibonacci Generator...");
const terms = 10;
console.log("Generating first " + terms + " terms:");
const result = fibonacci(terms);
console.log("Output: " + JSON.stringify(result));`,
    analysis: {
      python: { time: 'O(N)', space: 'O(N)', features: 'List appending, negative indexing (seq[-1])' },
      c: { time: 'O(N)', space: 'O(1)', features: '64-bit integer values (long long), iterative accumulator' },
      java: { time: 'O(N)', space: 'O(N)', features: 'ArrayList generic collection, 64-bit Long objects' },
      javascript: { time: 'O(N)', space: 'O(N)', features: 'Standard dynamic arrays, push operations' }
    }
  },
  'bubble sort': {
    explanation: 'Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent items, and swapping them if they are in the wrong order. A boolean flag can optimize the bubble sort to exit early if the array becomes sorted before finishing all loops.',
    python: `def bubble_sort(arr: list[int]) -> list[int]:
    """
    Sorts list in place using optimized Bubble Sort.
    Time Complexity: O(N^2) worst/average, O(N) best
    Space Complexity: O(1) auxiliary
    """
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# Driver Execution
if __name__ == '__main__':
    data = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {data}")
    print(f"Sorted:   {bubble_sort(data)}")`,
    c: `#include <stdio.h>
#include <stdbool.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap values
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!swapped) break;
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);
    bubbleSort(data, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", data[i]);
    }
    printf("\\n");
    return 0;
}`,
    java: `import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap values
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(data));
        bubbleSort(data);
        System.out.println("Sorted:   " + Arrays.toString(data));
    }
}`,
    javascript: `/**
 * Sorts array using optimized Bubble Sort.
 * @param {number[]} arr
 * @return {number[]}
 */
function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    for (let i = 0; i < n; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap values
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

// Sandbox execution test
console.log("Running Bubble Sort...");
const list = [64, 34, 25, 12, 22, 11, 90];
console.log("Original List: " + JSON.stringify(list));
const sorted = bubbleSort(list);
console.log("Sorted List:   " + JSON.stringify(sorted));`,
    analysis: {
      python: { time: 'O(N²)', space: 'O(1)', features: 'In-place tuple packing swap assignment (a,b = b,a)' },
      c: { time: 'O(N²)', space: 'O(1)', features: 'Boolean flag, pointer-free stack array modifications' },
      java: { time: 'O(N²)', space: 'O(1)', features: 'Array length field helper, in-place sorting utility' },
      javascript: { time: 'O(N²)', space: 'O(1)', features: 'Mutable array argument, variable swapping' }
    }
  },
  'reverse a string': {
    explanation: 'Reversing a string looks different across languages. Python and JavaScript have built-in utility abstractions (slice/split-reverse-join), whereas low-level languages like C require in-place manipulation of a mutable character array using two pointers (left and right).',
    python: `def reverse_string(s: str) -> str:
    """
    Reverses string using Python slicing.
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    return s[::-1]

# Driver Execution
if __name__ == '__main__':
    original = "hello world"
    print(f"Original: {original}")
    print(f"Reversed: {reverse_string(original)}")`,
    c: `#include <stdio.h>
#include <string.h>

void reverseString(char* s) {
    int left = 0;
    int right = strlen(s) - 1;
    char temp;
    
    // In-place double pointer swap
    while (left < right) {
        temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char data[] = "hello world";
    printf("Original: %s\\n", data);
    reverseString(data);
    printf("Reversed: %s\\n", data);
    return 0;
}`,
    java: `public class ReverseString {
    public static String reverse(String s) {
        // String is immutable in Java, so StringBuilder is used
        return new StringBuilder(s).reverse().toString();
    }

    public static void main(String[] args) {
        String original = "hello world";
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reverse(original));
    }
}`,
    javascript: `/**
 * Reverses a string using built-in array methods.
 * @param {string} s
 * @return {string}
 */
function reverseString(s) {
    return s.split('').reverse().join('');
}

// Sandbox execution test
console.log("Running String Reverse...");
const str = "hello world";
console.log("Original String: " + str);
const reversed = reverseString(str);
console.log("Reversed String: " + reversed);`,
    analysis: {
      python: { time: 'O(N)', space: 'O(N)', features: 'Extended slice slice notation ([::-1])' },
      c: { time: 'O(N)', space: 'O(1)', features: 'In-place character swap, standard pointer index increments' },
      java: { time: 'O(N)', space: 'O(N)', features: 'StringBuilder buffer heap allocation, object methods' },
      javascript: { time: 'O(N)', space: 'O(N)', features: 'Split string to array, reverse array, join to string' }
    }
  },
  'prime number checker': {
    explanation: 'An optimized primality test checks if a number is divisible by any integer from 2 up to the square root of that number (sqrt(N)). This is because any factor larger than the square root must have a matching factor smaller than the square root.',
    python: `import math

def is_prime(n: int) -> bool:
    """
    Checks if a number is prime using sqrt(N) loop bounds.
    Time Complexity: O(sqrt(N))
    Space Complexity: O(1)
    """
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
        
    # Check odd numbers up to sqrt(N)
    for i in range(3, int(math.isqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

# Driver Execution
if __name__ == '__main__':
    test_nums = [1, 2, 4, 17, 29, 100]
    for num in test_nums:
        print(f"Is {num} prime? {is_prime(num)}")`,
    c: `#include <stdio.h>
#include <stdbool.h>
#include <math.h>

bool isPrime(int n) {
    if (n <= 1) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    
    int limit = (int)sqrt(n);
    for (int i = 3; i <= limit; i += 2) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int test = 29;
    printf("%d is prime: %s\\n", test, isPrime(test) ? "true" : "false");
    return 0;
}`,
    java: `public class PrimeCheck {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        
        int limit = (int) Math.sqrt(n);
        for (int i = 3; i <= limit; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        int test = 29;
        System.out.println(test + " is prime: " + isPrime(test));
    }
}`,
    javascript: `/**
 * Checks primality up to Square Root of N.
 * @param {number} n
 * @return {boolean}
 */
function isPrime(n) {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= limit; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

// Sandbox execution test
console.log("Running Primality Test...");
const candidates = [1, 2, 4, 17, 29, 100];
candidates.forEach(num => {
    console.log("Number: " + num + " -> isPrime? " + isPrime(num));
});`,
    analysis: {
      python: { time: 'O(√N)', space: 'O(1)', features: 'math.isqrt optimized integer square root API' },
      c: { time: 'O(√N)', space: 'O(1)', features: 'Implicit type casting, sqrt double function math.h' },
      java: { time: 'O(√N)', space: 'O(1)', features: 'Math.sqrt utility, simple iterative odd numbers checks' },
      javascript: { time: 'O(√N)', space: 'O(1)', features: 'Math.floor, Math.sqrt, array iteration loop' }
    }
  },
  'implement binary search': {
    explanation: 'Binary Search is a divide-and-conquer algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and halves the search space at each iteration.',
    python: `def binary_search(arr: list[int], target: int) -> int:
    """
    Iterative binary search. Returns index of target, or -1 if not found.
    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Driver Execution
if __name__ == '__main__':
    sorted_arr = [1, 3, 5, 7, 9, 11, 13, 15]
    search_target = 9
    idx = binary_search(sorted_arr, search_target)
    print(f"Target {search_target} found at index: {idx}")`,
    c: `#include <stdio.h>

int binarySearch(int arr[], int size, int target) {
    int left = 0;
    int right = size - 1;
    
    while (left <= right) {
        // Prevents integer overflow compared to (left + right) / 2
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    int sorted_arr[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int size = sizeof(sorted_arr) / sizeof(sorted_arr[0]);
    int target = 9;
    int index = binarySearch(sorted_arr, size, target);
    printf("Target %d at index: %d\\n", target, index);
    return 0;
}`,
    java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sortedArr = {1, 3, 5, 7, 9, 11, 13, 15};
        int target = 9;
        int index = binarySearch(sortedArr, target);
        System.out.println("Target " + target + " found at index: " + index);
    }
}`,
    javascript: `/**
 * Performs iterative binary search.
 * @param {number[]} arr
 * @param {number} target
 * @return {number} index
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Sandbox execution test
console.log("Running Binary Search...");
const sorted = [1, 3, 5, 7, 9, 11, 13, 15];
const target = 9;
console.log("Sorted Array: " + JSON.stringify(sorted));
console.log("Target Element: " + target);
const index = binarySearch(sorted, target);
console.log("Found at index: " + index);`,
    analysis: {
      python: { time: 'O(log N)', space: 'O(1)', features: 'Floor division operator (//) for mid calculation' },
      c: { time: 'O(log N)', space: 'O(1)', features: 'Overflow protected offset calculation (left + (right - left)/2)' },
      java: { time: 'O(log N)', space: 'O(1)', features: 'Divide-and-conquer logic, stack variables' },
      javascript: { time: 'O(log N)', space: 'O(1)', features: 'Math.floor floating point adjustments for indices' }
    }
  }
};

// Add expected outputs to the Demo Database dynamically to avoid massive diff replacements
DEMO_DB['two sum'].output = "Running Two Sum Execution...\nInput Array: [2,7,11,15]\nTarget Sum: 9\nResult indices: [0,1]";
DEMO_DB['fibonacci sequence'].output = "Running Fibonacci Generator...\nGenerating first 10 terms:\nOutput: [0,1,1,2,3,5,8,13,21,34]";
DEMO_DB['bubble sort'].output = "Running Bubble Sort...\nOriginal List: [64,34,25,12,22,11,90]\nSorted List:   [11,12,22,25,34,64,90]";
DEMO_DB['reverse a string'].output = "Running String Reverse...\nOriginal String: hello world\nReversed String: dlrow olleh";
DEMO_DB['prime number checker'].output = "Running Primality Test...\nNumber: 1 -> isPrime? false\nNumber: 2 -> isPrime? true\nNumber: 4 -> isPrime? false\nNumber: 17 -> isPrime? true\nNumber: 29 -> isPrime? true\nNumber: 100 -> isPrime? false";
DEMO_DB['implement binary search'].output = "Running Binary Search...\nSorted Array: [1,3,5,7,9,11,13,15]\nTarget Element: 9\nFound at index: 4";

// ---------------------------------------------------------------------
// Initialize Application
// ---------------------------------------------------------------------
function init() {
  updateStatusUI();
  renderHistory();
  
  // Show default loaded item on startup (Two Sum)
  loadDemoQuestion('Two Sum');
  
  // Event Listeners
  els.searchForm.addEventListener('submit', handleSearchSubmit);
  
  // Settings Button Bindings
  els.openSettingsBtn.addEventListener('click', () => {
    els.geminiApiKeyInput.value = STATE.apiKey;
    els.settingsModal.classList.add('open');
  });
  
  els.closeSettingsBtn.addEventListener('click', () => {
    els.settingsModal.classList.remove('open');
  });
  
  els.saveSettingsBtn.addEventListener('click', () => {
    const key = els.geminiApiKeyInput.value.trim();
    if (key) {
      STATE.apiKey = key;
      localStorage.setItem('gemini_api_key', key);
      showToast('API Key saved successfully.');
    } else {
      showToast('Key input field was empty.', true);
    }
    els.settingsModal.classList.remove('open');
    updateStatusUI();
  });
  
  els.clearKeyBtn.addEventListener('click', () => {
    STATE.apiKey = '';
    localStorage.removeItem('gemini_api_key');
    els.geminiApiKeyInput.value = '';
    showToast('Saved API Key cleared.');
    els.settingsModal.classList.remove('open');
    updateStatusUI();
  });
}

// ---------------------------------------------------------------------
// Search Handler
// ---------------------------------------------------------------------
async function handleSearchSubmit(e) {
  e.preventDefault();
  const query = els.searchInput.value.trim();
  if (!query) return;
  
  // 1. Check if query matches a demo question
  const lowerQuery = query.toLowerCase();
  let matchedDemoKey = null;
  
  for (const key of Object.keys(DEMO_DB)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      matchedDemoKey = key;
      break;
    }
  }
  
  // Add to state history
  addToHistory(query);
  
  if (matchedDemoKey) {
    // Load from local database directly
    displayData(DEMO_DB[matchedDemoKey], query);
    showToast(`Loaded precompiled solution for "${query}".`);
    els.searchInput.value = '';
    return;
  }
  
  // 2. If no match and no API Key, display alert
  if (!STATE.apiKey) {
    showToast('API Key needed for arbitrary queries. Configure in Settings.', true);
    els.settingsModal.classList.add('open');
    return;
  }
  
  // 3. Trigger API Loader
  await generateCodeFromAPI(query);
}

// ---------------------------------------------------------------------
// Gemini API Integration
// ---------------------------------------------------------------------
async function generateCodeFromAPI(query) {
  showLoading(true);
  
  const systemPrompt = `You are a Senior Polyglot Software Architect. Your task is to generate complete, high-quality, optimal code implementations for a programming question in four languages: Python, C, Java, and JavaScript.
  
The question is: "${query}"

You MUST respond strictly in valid JSON matching this format EXACTLY:
{
  "explanation": "A concise explanation detailing the algorithmic approach, data structures, and edge cases.",
  "python": "# Python solution here...",
  "c": "// C solution here...",
  "java": "// Java solution here...",
  "javascript": "// JS solution here...",
  "output": "Expected terminal/console stdout output when these solutions are executed with a sample input.",
  "analysis": {
    "python": { "time": "O(..)", "space": "O(..)", "features": "Key feature or paradigm used in python" },
    "c": { "time": "O(..)", "space": "O(..)", "features": "Key feature or paradigm used in C" },
    "java": { "time": "O(..)", "space": "O(..)", "features": "Key feature or paradigm used in Java" },
    "javascript": { "time": "O(..)", "space": "O(..)", "features": "Key feature or paradigm used in JavaScript" }
  }
}

Important Instructions:
1. Ensure the code implementations are fully functional, readable, and include standard imports (e.g. #include <stdio.h>, import java.util.*).
2. The JavaScript code should end with console.log output tests so the user can run the script and see logs.
3. Do not place markdown backticks (like \`\`\`json) outside the JSON. Return only the raw JSON.`;

  try {
    const model = 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${STATE.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'API request failed');
    }
    
    const result = await response.json();
    const jsonText = result.candidates[0].content.parts[0].text;
    
    // Parse response
    const parsedData = cleanAndParseJSON(jsonText);
    
    // Display parsed outputs
    displayData(parsedData, query);
    showToast(`Code successfully generated for "${query}"!`);
    els.searchInput.value = '';
    
  } catch (err) {
    console.error(err);
    showToast(err.message || 'Error occurred generating content.', true);
  } finally {
    showLoading(false);
  }
}

// ---------------------------------------------------------------------
// Presentation and UI logic
// ---------------------------------------------------------------------
// Helper to clean markdown JSON wrappers from Gemini responses
function cleanAndParseJSON(rawText) {
  let cleanText = rawText.trim();
  if (cleanText.startsWith('```')) {
    const firstNewLine = cleanText.indexOf('\n');
    if (firstNewLine !== -1) {
      cleanText = cleanText.substring(firstNewLine + 1);
    } else {
      cleanText = cleanText.replace(/^```[a-zA-Z]*/, '');
    }
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  return JSON.parse(cleanText.trim());
}

function displayData(data, query) {
  if (query) {
    data.query = query;
  }
  STATE.currentData = data;
  
  // Hide landing view, display cards
  els.welcomeContainer.style.display = 'none';
  els.outputBoard.style.display = 'grid';
  els.compareMatrix.style.display = 'block';
  
  // Render current selected tab language
  renderCode();
  
  // Render sidebar descriptions
  els.algorithmExplanation.textContent = data.explanation;
  
  // Render expected execution output
  els.expectedOutput.textContent = data.output || 'No output captured.';
  
  // Render complexity comparison table
  renderComparisonTable(data.analysis);
  
  // Update query history selected element classes
  renderHistory();
}

function renderCode() {
  if (!STATE.currentData) return;
  
  const lang = STATE.currentLanguage;
  const code = STATE.currentData[lang];
  
  // Clear and populate display
  els.codeDisplay.className = `language-${lang}`;
  els.codeDisplay.textContent = code;
  
  // Show/Hide run button based on JS language
  if (lang === 'javascript') {
    els.btnRunJs.style.display = 'block';
    els.terminalPanel.style.display = 'flex';
  } else {
    els.btnRunJs.style.display = 'none';
    els.terminalPanel.style.display = 'none';
  }
  
  // Re-trigger Prism syntax highlight
  Prism.highlightElement(els.codeDisplay);
  
  // Update complexity markers for selected language
  const analysis = STATE.currentData.analysis[lang];
  if (analysis) {
    els.timeComplexity.textContent = analysis.time || 'O(1)';
    els.spaceComplexity.textContent = analysis.space || 'O(1)';
  }
}

function renderComparisonTable(analysis) {
  let html = '';
  const order = ['python', 'c', 'java', 'javascript'];
  const titles = { python: 'Python', c: 'C', java: 'Java', javascript: 'JavaScript' };
  
  order.forEach(lang => {
    const info = analysis[lang] || { time: 'N/A', space: 'N/A', features: 'N/A' };
    html += `
      <tr>
        <td><span class="badge-lang ${lang}">${titles[lang]}</span></td>
        <td><code style="font-family:'JetBrains Mono'; color:#06b6d4;">${info.time}</code></td>
        <td><code style="font-family:'JetBrains Mono'; color:#a5b4fc;">${info.space}</code></td>
        <td>${info.features}</td>
      </tr>
    `;
  });
  els.compareTableBody.innerHTML = html;
}

function switchLanguage(lang) {
  STATE.currentLanguage = lang;
  
  // Update tab buttons active classes
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  renderCode();
}

// Sandbox execution terminal emulator
function runJavaScriptCode() {
  if (!STATE.currentData || STATE.currentLanguage !== 'javascript') return;
  
  const code = STATE.currentData.javascript;
  
  // Clear terminal
  els.terminalBody.innerHTML = '';
  
  // Redirect logs
  const logs = [];
  const localConsole = {
    log: (...args) => {
      const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
      logs.push({ text: msg, type: 'log' });
    },
    error: (...args) => {
      const msg = args.join(' ');
      logs.push({ text: msg, type: 'error' });
    },
    warn: (...args) => {
      const msg = args.join(' ');
      logs.push({ text: msg, type: 'warn' });
    }
  };
  
  try {
    // Run the javascript text inside a clean IIFE closure
    const runner = new Function('console', code);
    runner(localConsole);
  } catch (err) {
    logs.push({ text: 'Runtime Error: ' + err.message, type: 'error' });
  }
  
  // Print output items in terminal emulator
  if (logs.length === 0) {
    els.terminalBody.innerHTML = `<div class="terminal-row term-empty">Script executed successfully, but returned no logs.</div>`;
  } else {
    logs.forEach(log => {
      let rowStyle = '';
      if (log.type === 'error') rowStyle = 'color: #ef4444;';
      if (log.type === 'warn') rowStyle = 'color: #f59e0b;';
      
      const row = document.createElement('div');
      row.className = 'terminal-row';
      row.innerHTML = `
        <span class="term-prompt">&gt;</span>
        <span style="${rowStyle}">${escapeHtml(log.text)}</span>
      `;
      els.terminalBody.appendChild(row);
    });
  }
  showToast('JavaScript execution complete.');
}

// ---------------------------------------------------------------------
// History & State persistence utilities
// ---------------------------------------------------------------------
function addToHistory(query) {
  // Check duplicates
  const index = STATE.history.findIndex(item => item.query.toLowerCase() === query.toLowerCase());
  if (index !== -1) {
    STATE.history.splice(index, 1);
  }
  
  STATE.history.unshift({ query, date: new Date().toISOString() });
  
  // Cap at 15 items
  if (STATE.history.length > 15) {
    STATE.history.pop();
  }
  
  localStorage.setItem('codementor_history', JSON.stringify(STATE.history));
  renderHistory();
}

function renderHistory() {
  let html = '';
  STATE.history.forEach(item => {
    const activeClass = (STATE.currentData && STATE.currentData.query === item.query) ? 'active' : '';
    html += `<li class="history-item ${activeClass}" onclick="handleHistoryClick('${escapeHtml(item.query)}')">${escapeHtml(item.query)}</li>`;
  });
  els.historyList.innerHTML = html;
}

function handleHistoryClick(query) {
  // Try loading demo database first
  const lowerQuery = query.toLowerCase();
  let matchedDemoKey = null;
  
  for (const key of Object.keys(DEMO_DB)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      matchedDemoKey = key;
      break;
    }
  }
  
  if (matchedDemoKey) {
    displayData(DEMO_DB[matchedDemoKey], query);
    showToast(`Loaded "${query}" solution.`);
    renderHistory();
    return;
  }
  
  if (!STATE.apiKey) {
    showToast('Configure API Key in settings to reload custom queries.', true);
    els.settingsModal.classList.add('open');
    return;
  }
  
  generateCodeFromAPI(query);
}

function applySuggestion(query) {
  els.searchInput.value = query;
  if (typeof els.searchForm.requestSubmit === 'function') {
    els.searchForm.requestSubmit();
  } else {
    const event = new Event('submit', { cancelable: true, bubbles: true });
    els.searchForm.dispatchEvent(event);
  }
}

function loadDemoQuestion(name) {
  const key = name.toLowerCase();
  if (DEMO_DB[key]) {
    displayData(DEMO_DB[key], name);
  }
}

// Helper to escape HTML tags to avoid DOM rendering bugs in terminal
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Clipboard copier
function copyCodeToClipboard() {
  if (!STATE.currentData) return;
  const code = STATE.currentData[STATE.currentLanguage];
  
  navigator.clipboard.writeText(code)
    .then(() => {
      showToast(`${STATE.currentLanguage.toUpperCase()} code copied to clipboard!`);
    })
    .catch(err => {
      showToast('Failed to copy code.', true);
    });
}

// ---------------------------------------------------------------------
// UI Shell Controls
// ---------------------------------------------------------------------
function updateStatusUI() {
  if (STATE.apiKey) {
    els.statusDot.className = 'status-dot active';
    els.statusText.textContent = 'Gemini API Connected';
  } else {
    els.statusDot.className = 'status-dot demo';
    els.statusText.textContent = 'Demo Mode (Key Unconfigured)';
  }
}

function showLoading(isLoading) {
  if (isLoading) {
    els.shimmerWrapper.style.display = 'flex';
    els.welcomeContainer.style.display = 'none';
    els.outputBoard.style.display = 'none';
    els.compareMatrix.style.display = 'none';
  } else {
    els.shimmerWrapper.style.display = 'none';
  }
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast-msg');
  const text = document.getElementById('toast-text');
  const icon = document.getElementById('toast-icon');
  
  text.textContent = message;
  if (isError) {
    icon.className = 'fa-solid fa-triangle-exclamation';
    toast.style.borderLeftColor = '#ef4444';
  } else {
    icon.className = 'fa-solid fa-circle-check';
    toast.style.borderLeftColor = 'var(--accent-cyan)';
  }
  
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Bootstrap
window.onload = init;
