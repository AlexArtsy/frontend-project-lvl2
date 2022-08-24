#!/usr/bin/env node
//  это исполняемый файл - утилита (не путать с модулем src/gendiff.js)
import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .name('gendiff')
  .usage('gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .argument('<filePath1>', 'path to file1')
  .argument('<filePath2>', 'path to file2')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    const formatter = options.format === 'stylish' ? stylish : null;
    console.log(genDiff(filePath1, filePath2, formatter));
  });

program.parse();
