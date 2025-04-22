import { describe, expect, it } from 'bun:test'
import staplerCat from '../samples/stapler-cat.png'
import { getbase64Image } from '../src/utils'

describe('getbase64Image', () => {
	it('should fetch an image and return a base64-encoded string', async () => {
		const base64String = await getbase64Image(`file://${staplerCat}`)
		expect(base64String).toMatch('data:image/png;base64,')
	})
})
