import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

const parser = (filepath) => {
    if (path.extname(filepath) === '.yml'
    || path.extname(filepath) === '.yaml') {
      return yaml.load(fs.readFileSync(filepath, 'utf-8'));
    }
  
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  };

export default parser;