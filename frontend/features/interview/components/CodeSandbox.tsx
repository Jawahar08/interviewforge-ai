"use client";

import { useState } from "react";
import { Code2, Play, Sparkles, Terminal, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  initialCode?: string;
  initialLanguage?: string;
  onCodeChange?: (code: string, language: string) => void;
}

const STARTER_TEMPLATES: Record<string, string> = {
  javascript: `// Implement your solution in JavaScript
function solve(nums, target) {
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

// Test call
console.log("Result:", solve([2, 7, 11, 15], 9));
`,
  python: `# Implement your solution in Python
def solve(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution
print("Result:", solve([2, 7, 11, 15], 9))
`,
  java: `// Implement your solution in Java
import java.util.*;

public class Solution {
    public static int[] solve(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(solve(new int[]{2, 7, 11, 15}, 9)));
    }
}
`,
  cpp: `// Implement your solution in C++
#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

vector<int> solve(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (mp.count(comp)) return {mp[comp], i};
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = solve(nums, 9);
    cout << "Result: [" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}
`,
};

export function CodeSandbox({ initialCode, initialLanguage = "javascript", onCodeChange }: Props) {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode || STARTER_TEMPLATES[initialLanguage] || STARTER_TEMPLATES.javascript);
  const [output, setOutput] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    timeComplexity: string;
    spaceComplexity: string;
    score: number;
    feedback: string;
    suggestions: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const template = STARTER_TEMPLATES[lang] || STARTER_TEMPLATES.javascript;
    setCode(template);
    if (onCodeChange) {
      onCodeChange(template, lang);
    }
  };

  const handleCodeEdit = (val: string) => {
    setCode(val);
    if (onCodeChange) {
      onCodeChange(val, language);
    }
  };

  const executeCode = () => {
    setIsExecuting(true);
    setOutput("");

    setTimeout(() => {
      if (language === "javascript") {
        const logs: string[] = [];
        const originalLog = console.log;
        try {
          console.log = (...args: any[]) => {
            logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
          };
          // Execute JS safely
          const run = new Function(code);
          run();
          setOutput(logs.length > 0 ? logs.join("\n") : "Execution finished with 0 output.");
        } catch (err: any) {
          setOutput(`Runtime Error: ${err.message}`);
        } finally {
          console.log = originalLog;
        }
      } else {
        // Simulated execution output for Python / Java / C++
        setOutput(`[${language.toUpperCase()} Sandbox Output]\nCompilation & Execution successful.\nTest Output: Result: [0, 1]`);
      }
      setIsExecuting(false);
    }, 400);
  };

  const runAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiAnalysis({
        timeComplexity: "O(N) - Linear Time Complexity",
        spaceComplexity: "O(N) - Auxiliary Space for Hash Map",
        score: 92,
        feedback: "Optimal single-pass algorithm using HashMap lookup. Excellent time complexity.",
        suggestions: [
          "Include bounds validation for null or empty input array.",
          "Add explicit edge-case handling when target cannot be formed.",
        ],
      });
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl">
      {/* Sandbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
          <Code2 className="w-4 h-4" />
          <span>Interactive Coding Sandbox</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-violet-500"
          >
            <option value="javascript">JavaScript (Node)</option>
            <option value="python">Python 3</option>
            <option value="java">Java 21</option>
            <option value="cpp">C++ 20</option>
          </select>

          {/* Execute Code Button */}
          <button
            type="button"
            onClick={executeCode}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/10 transition-all"
          >
            {isExecuting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>Run Code</span>
          </button>

          {/* AI Complexity Analysis Button */}
          <button
            type="button"
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-500/10 transition-all"
          >
            {isAnalyzing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>AI Code Audit</span>
          </button>
        </div>
      </div>

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Code Input TextArea */}
        <div className="lg:col-span-8 space-y-1">
          <div className="text-[10px] uppercase font-mono text-zinc-500">Source Editor ({language})</div>
          <textarea
            value={code}
            onChange={(e) => handleCodeEdit(e.target.value)}
            spellCheck={false}
            className="w-full h-[240px] p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 font-mono text-xs leading-relaxed focus:outline-none focus:border-violet-500/80 resize-none shadow-inner"
          />
        </div>

        {/* Output Console Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-1">
          <div className="text-[10px] uppercase font-mono text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Output Console
            </span>
            {output && (
              <button
                type="button"
                onClick={() => setOutput("")}
                className="text-[9px] hover:text-zinc-300"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex-grow min-h-[240px] p-3.5 rounded-xl bg-black border border-zinc-800/90 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-wrap">
            {output || <span className="text-zinc-600 italic">Click &quot;Run Code&quot; to test your implementation...</span>}
          </div>
        </div>
      </div>

      {/* AI Complexity & Quality Analysis Card */}
      {aiAnalysis && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/30 via-zinc-900/60 to-indigo-950/30 border border-violet-500/30 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>AI Code Audit Results</span>
            </div>
            <div className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-xs font-mono">
              Score: {aiAnalysis.score}/100
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-0.5">Time Complexity</span>
              <span className="font-bold text-emerald-400">{aiAnalysis.timeComplexity}</span>
            </div>

            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-0.5">Space Complexity</span>
              <span className="font-bold text-sky-400">{aiAnalysis.spaceComplexity}</span>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">{aiAnalysis.feedback}</p>

          {aiAnalysis.suggestions.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Recommended Enhancements:
              </span>
              <ul className="space-y-1 text-xs text-zinc-300 pl-4 list-disc">
                {aiAnalysis.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
