import "@webgpu/types";

// The WebGPU types are global declarations, not a module. Importing them from a
// declaration file brings them into the project without a triple-slash
// reference, which `shadcn add` strips as a leading comment, and without
// asking anyone to edit tsconfig.json.
