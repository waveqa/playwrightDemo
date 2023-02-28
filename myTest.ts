import { test as base } from '@playwright/test';
import * as creds from "./e2e/data/credentials.json"

export type TestOptions = {
    person: object;
};

export const test = base.extend<TestOptions>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  person: [{username: creds.firstUser.username, password: creds.firstUser.password}, { option: true }],

});