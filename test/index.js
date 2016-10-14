import test from 'ava';
import leftPad from '../lib';

test('should work', t => {
  t.is(leftPad('poop', 8), '    poop');
});

test('should not crash all of npm', t => {
  t.truthy('meh');
});
