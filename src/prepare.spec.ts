import { describe, expect, test } from '@jest/globals'
import { parsePrereleaseVersion } from './prepare'
import SemanticReleaseError from '@semantic-release/error'

describe('parsePrereleaseVersion', () => {
    test('success case - typical semantic-release prerelease version string', () => {
        expect(parsePrereleaseVersion('1.0.0-develop.1')).toEqual('1.0.0')
    })

    test('success case - normal semantic-release version string', () => {
        expect(parsePrereleaseVersion('1.0.0')).toEqual('1.0.0')
    })

    test('failure case - no semantic-release version in string', () => {
        expect(() => { parsePrereleaseVersion('develop.1') }).toThrow(SemanticReleaseError)
    })

    test('failure case - empty string', () => {
        expect(() => { parsePrereleaseVersion('') }).toThrow(SemanticReleaseError)
    })
})