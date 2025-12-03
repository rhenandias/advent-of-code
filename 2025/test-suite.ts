import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestResult {
  day: string;
  part: string;
  type: "test" | "input";
  expected: string;
  actual: string;
  passed: boolean;
  duration: number;
}

interface Results {
  [key: string]: string;
}

// Cores para o terminal
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

// Carrega os resultados esperados
function loadExpectedResults(): Results {
  const resultsPath = path.join(__dirname, "results.json");
  const content = fs.readFileSync(resultsPath, "utf-8");
  return JSON.parse(content);
}

// Executa um script e captura a saída
async function runScript(
  scriptPath: string,
  inputFile: string
): Promise<{ output: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const process = spawn("node", [scriptPath, inputFile], {
      cwd: path.dirname(scriptPath),
    });

    let output = "";
    let errorOutput = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    process.on("close", (code) => {
      const duration = Date.now() - startTime;

      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}: ${errorOutput}`));
      } else {
        resolve({ output, duration });
      }
    });
  });
}

// Extrai o resultado final da saída
function extractResult(output: string): string {
  const match = output.match(/Final Result:\s*(\d+)/);
  return match ? match[1] : "";
}

// Encontra todos os dias disponíveis
function findAllDays(): string[] {
  const days: string[] = [];

  const entries = fs.readdirSync(__dirname, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith("day")) {
      days.push(entry.name);
    }
  }

  return days.sort();
}

// Executa todos os testes
async function runAllTests(): Promise<void> {
  console.log(
    `${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.cyan}║           🎄 Advent of Code 2025 - Test Suite 🎄           ║${colors.reset}`
  );
  console.log(
    `${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`
  );

  const expectedResults = loadExpectedResults();
  const days = findAllDays();
  const results: TestResult[] = [];
  const totalStartTime = Date.now();

  for (const day of days) {
    const dayPath = path.join(__dirname, day);
    const dayNumber = day.replace("day", "");

    console.log(
      `${colors.blue}━━━ Day ${dayNumber} ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`
    );

    // Testa parte 1 e 2
    for (const part of ["01", "02"]) {
      const scriptPath = path.join(dayPath, `${part}.ts`);

      // Verifica se o script existe
      if (!fs.existsSync(scriptPath)) {
        console.log(
          `${colors.gray}  Part ${part}: Script não encontrado${colors.reset}`
        );
        continue;
      }

      // Testa com test.txt
      const testFile = path.join(dayPath, "test.txt");
      if (fs.existsSync(testFile)) {
        const testKey = `day-${dayNumber}-${parseInt(part)}-test`;
        const expected = expectedResults[testKey];

        if (expected) {
          try {
            const { output, duration } = await runScript(
              scriptPath,
              "test.txt"
            );
            const actual = extractResult(output);
            const passed = actual === expected;

            results.push({
              day: dayNumber,
              part: part,
              type: "test",
              expected,
              actual,
              passed,
              duration,
            });

            const status = passed
              ? `${colors.green}✓ PASS${colors.reset}`
              : `${colors.red}✗ FAIL${colors.reset}`;
            const timeStr = `${colors.gray}(${duration}ms)${colors.reset}`;
            console.log(
              `  Part ${part} [TEST]:  ${status} ${timeStr} - Expected: ${expected}, Got: ${actual}`
            );
          } catch (error) {
            console.log(
              `  Part ${part} [TEST]:  ${colors.red}✗ ERROR${colors.reset} - ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        }
      }

      // Testa com input.txt
      const inputFile = path.join(dayPath, "input.txt");
      if (fs.existsSync(inputFile)) {
        const inputKey = `day-${dayNumber}-${parseInt(part)}-input`;
        const expected = expectedResults[inputKey];

        if (expected) {
          try {
            const { output, duration } = await runScript(
              scriptPath,
              "input.txt"
            );
            const actual = extractResult(output);
            const passed = actual === expected;

            results.push({
              day: dayNumber,
              part: part,
              type: "input",
              expected,
              actual,
              passed,
              duration,
            });

            const status = passed
              ? `${colors.green}✓ PASS${colors.reset}`
              : `${colors.red}✗ FAIL${colors.reset}`;
            const timeStr = `${colors.gray}(${duration}ms)${colors.reset}`;
            console.log(
              `  Part ${part} [INPUT]: ${status} ${timeStr} - Expected: ${expected}, Got: ${actual}`
            );
          } catch (error) {
            console.log(
              `  Part ${part} [INPUT]: ${colors.red}✗ ERROR${colors.reset} - ${
                error instanceof Error ? error.message : String(error)
              }`
            );
          }
        }
      }
    }

    console.log(); // Linha em branco entre dias
  }

  // Resumo final
  const totalDuration = Date.now() - totalStartTime;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  console.log(
    `${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.cyan}║                      📊 Summary                            ║${colors.reset}`
  );
  console.log(
    `${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}`
  );
  console.log(
    `  Total Tests: ${total} | ${colors.green}Passed: ${passed}${colors.reset} | ${colors.red}Failed: ${failed}${colors.reset}`
  );
  console.log(
    `  Total Duration: ${colors.yellow}${totalDuration}ms${colors.reset}`
  );

  if (failed === 0 && total > 0) {
    console.log(
      `\n${colors.green}  🎉 All tests passed! Great job! 🎉${colors.reset}\n`
    );
  } else if (failed > 0) {
    console.log(
      `\n${colors.yellow}  ⚠️  Some tests failed. Keep coding! ⚠️${colors.reset}\n`
    );
    process.exit(1);
  }
}

// Executa a suíte de testes
runAllTests().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
