export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  category: string;
  acceptanceRate: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterTemplates: Record<string, string>;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  solutionHint: string;
}

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    category: "Arrays & Hashing",
    acceptanceRate: "52.4%",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    starterTemplates: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Execution test
console.log("TwoSum Result:", twoSum([2, 7, 11, 15], 9));
`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

print("TwoSum Result:", twoSum([2, 7, 11, 15], 9))
`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (map.containsKey(diff)) {
                return new int[] { map.get(diff), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
}
`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (mp.count(diff)) return {mp[diff], i};
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = twoSum(nums, 9);
    cout << "Result: [" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}
`,
    },
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expectedOutput: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expectedOutput: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expectedOutput: "[0, 1]" },
    ],
    solutionHint: "Use a Hash Map to store numbers and their indices. For each element `nums[i]`, check if `target - nums[i]` is already in the map for O(N) time complexity.",
  },
  {
    id: "lru-cache",
    title: "146. LRU Cache",
    slug: "lru-cache",
    difficulty: "HARD",
    category: "Data Structures",
    acceptanceRate: "41.8%",
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\`, evict the least recently used key.

The functions \`get\` and \`put\` must each run in **O(1)** average time complexity.`,
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls will be made to get and put.",
    ],
    starterTemplates: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log("get(1):", cache.get(1)); // 1
cache.put(3, 3); // evicts key 2
console.log("get(2):", cache.get(2)); // -1
`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        val = self.cache.pop(key)
        self.cache[key] = val
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            oldest = next(iter(self.cache))
            del self.cache[oldest]
        self.cache[key] = value

c = LRUCache(2)
c.put(1, 1)
c.put(2, 2)
print("get(1):", c.get(1))
`,
      java: `import java.util.*;

class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }
    
    public int get(int key) {
        return map.getOrDefault(key, -1);
    }
    
    public void put(int key, int value) {
        map.put(key, value);
    }
}
`,
      cpp: `#include <unordered_map>
#include <list>
#include <iostream>

using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> dll;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (!mp.count(key)) return -1;
        dll.splice(dll.begin(), dll, mp[key]);
        return mp[key]->second;
    }
    
    void put(int key, int value) {
        if (mp.count(key)) {
            mp[key]->second = value;
            dll.splice(dll.begin(), dll, mp[key]);
            return;
        }
        if (dll.size() == cap) {
            int d_key = dll.back().first;
            dll.pop_back();
            mp.erase(d_key);
        }
        dll.push_front({key, value});
        mp[key] = dll.begin();
    }
};
`,
    },
    testCases: [
      { input: "LRUCache(2), put(1,1), put(2,2), get(1)", expectedOutput: "1" },
      { input: "put(3,3), get(2)", expectedOutput: "-1" },
      { input: "put(4,4), get(1)", expectedOutput: "-1" },
    ],
    solutionHint: "Combine a Doubly Linked List for node order maintenance with a Hash Map mapping keys to node pointers for O(1) time complexity.",
  },
  {
    id: "valid-anagram",
    title: "242. Valid Anagram",
    slug: "valid-anagram",
    difficulty: "EASY",
    category: "Strings",
    acceptanceRate: "63.2%",
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
      },
    ],
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters.",
    ],
    starterTemplates: {
      javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

console.log("isAnagram('anagram', 'nagaram'):", isAnagram('anagram', 'nagaram'));
`,
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = {}
    for char in s: count[char] = count.get(char, 0) + 1
    for char in t:
        if count.get(char, 0) == 0: return False
        count[char] -= 1
    return True

print("isAnagram:", isAnagram("anagram", "nagaram"))
`,
      java: `import java.util.*;

public class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int c : counts) if (c != 0) return false;
        return true;
    }
}
`,
      cpp: `#include <string>
#include <vector>
#include <iostream>

using namespace std;

bool isAnagram(string s, string t) {
    if (s.length() != t.length()) return false;
    vector<int> freq(26, 0);
    for (int i = 0; i < s.length(); i++) {
        freq[s[i] - 'a']++;
        freq[t[i] - 'a']--;
    }
    for (int count : freq) if (count != 0) return false;
    return true;
}
`,
    },
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: "true" },
      { input: 's = "rat", t = "car"', expectedOutput: "false" },
    ],
    solutionHint: "Count character frequencies using a fixed-size integer array of length 26. Increments for `s` and decrements for `t` should net to 0.",
  },
  {
    id: "max-subarray",
    title: "53. Maximum Subarray",
    slug: "max-subarray",
    difficulty: "MEDIUM",
    category: "Dynamic Programming",
    acceptanceRate: "50.6%",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.`,
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    starterTemplates: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

console.log("maxSubArray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
`,
      python: `def maxSubArray(nums: list[int]) -> int:
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

print("maxSubArray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
`,
      java: `public class Solution {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}
`,
      cpp: `#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}
`,
    },
    testCases: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", expectedOutput: "6" },
      { input: "nums = [1]", expectedOutput: "1" },
      { input: "nums = [5, 4, -1, 7, 8]", expectedOutput: "23" },
    ],
    solutionHint: "Use Kadane's Algorithm: maintain running sub-sum `currentSum = max(num, currentSum + num)` in O(N) time and O(1) space.",
  },
];
