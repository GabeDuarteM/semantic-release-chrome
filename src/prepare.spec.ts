import { describe, expect, test } from '@jest/globals'
import { formatExtensionVersion } from './prepare'
import SemanticReleaseError from '@semantic-release/error'

describe('parsePrereleaseVersion', () => {
  test('success case', () => {
    ;[
      ['1.0.0', '1.0.0'],
      ['1.0.0-develop', '1.0.0'],
      ['1.0.0-develop123', '1.0.0'],
      ['1.0.0-develop.5', '1.0.0.5'],
      ['1.0.0-dev.with.dots.123', '1.0.0.123'],
      ['1.0.0-dev.with1445.1', '1.0.0.1'],
    ].forEach(([input, expected]) =>
      expect(formatExtensionVersion(input)).toEqual(expected),
    )
  })

  test('failure case', () => {
    ;['develop.1', '1.12-dev.1', ''].forEach((input) =>
      expect(() => {
        formatExtensionVersion(input)
      }).toThrow(SemanticReleaseError),
    )
  })
})
