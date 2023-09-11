// TODO: implement params
export default function ConvertPath(path: string): string {
    const names: string[] = path.split('')
    if (path.startsWith('/') && path.endsWith('/')) {
        if (names.length == 2) {
            return path
        } else {
            const lastSlash: number = names.lastIndexOf('/')
            var result: string = '';
            names.forEach((name, index) => {
                if (index == lastSlash) return
                if (name == '') {
                    result += '/'
                }
                result += name
            })
            return result
        }
    } else if (!path.endsWith('/')) {
        return path
    }
}