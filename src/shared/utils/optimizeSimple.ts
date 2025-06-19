export function compressSimple(input: string): string {
    const runLengthEncode = (str:string): string => {
        let result = '';
        let i = 0;
        while (i < str.length) {
            const char = str[i];
            let j = i;
            while (j < str.length && str[j] === char) j++;
            const count = j - i;
            result += (count > 1 ? count : '') + char;
            i = j;
        }
        return result;
    };


    const foldRepeats = (s: string) : string => {
        const n = s.length;
        for (let size = Math.floor(n / 2); size >= 2; size--) {

            for (let start = 0; start + size * 2 <= n; start++) {
                const block = s.slice(start, start + size);
                let count = 1;
                let pos = start + size;
                while (s.slice(pos, pos + size) === block) {
                    count++;
                    pos += size;
                }
                if (count > 1) {
                    const compressed =
                        s.slice(0, start) +
                        `${count}(${foldRepeats(block)})` +
                        s.slice(start + size * count);

                    return  compressed; // Recursive: keep folding
                }
            }
        }
        return s;
    };

    const rleEncoded = runLengthEncode(input);
    return foldRepeats(rleEncoded);


}