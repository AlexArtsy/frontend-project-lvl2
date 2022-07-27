#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .usage('gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-v, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format');
  //.option('-h, --help', 'output usage information');

program.parse();
