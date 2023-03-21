#!/usr/bin/env node

import cli from './cli.js';
import project from './project.js';

const responses = await cli.run();

project.create(responses);
