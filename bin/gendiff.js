#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const genDiff = (filePath1, filePath2) => {
  const contentFile1 = fs.readFileSync(path.resolve(process.cwd(), filePath1), 'utf-8');
  const contentFile2 = fs.readFileSync(path.resolve(process.cwd(), filePath2), 'utf-8');

  console.log('file1:', contentFile1);
  console.log('file2:', contentFile2);
};

const program = new Command();

program
  .name('gendiff')
  .usage('gendiff [options] <filepath1> <filepath2>')
  .argument('<filePath1>', 'path to file1')
  .argument('<filePath2>', 'path to file2')
  .option('-f, --format <type>', 'output format')
  .action((filePath1, filePath2) => {
    genDiff(filePath1, filePath2);
  })
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .option('-h, --help', 'output usage information');

program.parse();

const options = program.opts();
console.log('format type:', options.format);

export default genDiff;
