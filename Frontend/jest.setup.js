// For React Testing Library
import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";

// Or if you're using other testing utilities:
// Add any global test setup here

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
