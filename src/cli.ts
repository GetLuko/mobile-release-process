export async function cli() {
  try {
    console.log("hello world");
  } catch (error: any) {
    console.error(`%s ERROR: ${error.message}`);
    process.exit(1);
  }
}
