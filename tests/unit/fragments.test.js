const Fragment = require('../../src/model/Frag');

test('creates a new fragment', () => {
  const fragment = new Fragment({
    ownerId: 'user@example.com',
    type: 'text/plain',
    content: 'Hello world',
  });

  expect(fragment).toHaveProperty('id');
  expect(fragment.type).toBe('text/plain');
});

test('fragment has an ownerId', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain' });
  expect(fragment.ownerId).toBe('user@example.com');
});

test('fragment stores correct content type', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/html' });
  expect(fragment.type).toBe('text/html');
});

test('fragment has created and updated timestamps', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain' });
  expect(fragment.created).toBeDefined();
  expect(fragment.updated).toBeDefined();
});

test('fragment supports markdown type', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/markdown' });
  expect(fragment.type).toBe('text/markdown');
});

test('fragment supports HTML type', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/html' });
  expect(fragment.type).toBe('text/html');
});

test('fragment supports CSS type', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/css' });
  expect(fragment.type).toBe('text/css');
});

test('fragment sets id automatically if not provided', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain' });
  expect(fragment.id).toBeDefined();
});

test('fragment handles JSON type', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'application/json' });
  expect(fragment.type).toBe('application/json');
});

test('fragment has correct JSON serialization', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain', content: 'hello' });
  const json = JSON.stringify(fragment);
  expect(typeof json).toBe('string');
});

test('fragment retains properties after JSON parse/stringify', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain', content: 'hello' });
  const json = JSON.parse(JSON.stringify(fragment));
  expect(json.type).toBe('text/plain');
});

test('fragment type is case-sensitive', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'Text/Plain' });
  expect(fragment.type).toBe('Text/Plain');
});

test('fragment ID remains unique', () => {
  const f1 = new Fragment({ ownerId: 'user@example.com', type: 'text/plain' });
  const f2 = new Fragment({ ownerId: 'user@example.com', type: 'text/plain' });
  expect(f1.id).not.toBe(f2.id);
});

test('fragment can handle numeric content in string form', () => {
  const fragment = new Fragment({ ownerId: 'user@example.com', type: 'text/plain', content: '12345' });
  expect(fragment.content).toBe('12345');
});
