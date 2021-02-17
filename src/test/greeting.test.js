const generateGreeting = (name = 'Nobody') => `Hello ${name}!`

test('greeting should include the name', () => {
    const result = generateGreeting('Mike');
    const expected = 'Hello Mike!'
    expect(result).toBe(expected)
})

test('greeting should include the default name', () => {
    const result = generateGreeting();
    const expected = 'Hello Nobody!'
    expect(result).toBe(expected)
})