function splitStringIntoChunks(input: string): any {
  if (input.length <= 40) {
    return { name1: input };
  }

  const words = input.split(' ');
  const result: { [key: string]: string } = {};
  let chunk = '';
  let keyIndex = 1;

  for (let word of words) {
    if ((chunk + word).length <= 40) {
      chunk += (chunk ? ' ' : '') + word;
    } else {
      result[`name${keyIndex}`] = chunk;
      keyIndex++;
      chunk = word;
    }
  }

  // Add the last chunk if not empty
  if (chunk) {
    result[`name${keyIndex}`] = chunk;
  }

  return result;
}

// Example usage:
const input = 'some very very very very very long string that exceeds the limit of forty characters';
const result = splitStringIntoChunks(input);
console.log(result);