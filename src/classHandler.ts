import path from "path";

class classHandler {
    async import(file: string, folder: string) {
        const fileExports = await import(path.join(folder + "/" + file))
        return fileExports;
    }
    instance(fileExports: any, fileExport: PropertyKey) {
        const fileClass = fileExports[fileExport];
        const classInstance = new fileClass()
        return classInstance;
    }
}
export const ClassHandler = new classHandler();