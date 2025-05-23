/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

// Add type declarations for any modules that don't have them
declare module 'path-browserify' {
  import path from 'path'
  export = path
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}