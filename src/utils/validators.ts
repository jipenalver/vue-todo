// 👉 IsEmpty
export const isEmpty = (value: null | undefined | string) => {
  if (value === null || value === undefined || value === '') return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown) => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown) => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj: unknown) =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'This field is required'

  return !!String(value).trim().length || 'This field is required'
}

// 👉 Email Validator
export const emailValidator = (value: string) => {
  if (isEmpty(value)) return true

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) || 'The Email field must be a valid email address'
    )

  return re.test(String(value)) || 'The Email field must be a valid email address'
}

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  const validPassword = regExp.test(password)

  return (
    validPassword ||
    'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>
  value === target || 'The Confirm Password field confirmation does not match'

// 👉 Between Validator
export const betweenValidator = (value: string, min: number, max: number) => {
  const valueAsNumber = Number(value)

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  )
}

// 👉 Integer Validator
export const integerValidator = (value: string) => {
  if (isEmpty(value)) return true

  if (Array.isArray(value))
    return value.every((val) => /^-?[0-9]+$/.test(String(val))) || 'This field must be a number'

  return /^-?[0-9]+$/.test(String(value)) || 'This field must be a number'
}

// 👉 Regex Validator
export const regexValidator = (value: string, regex: RegExp): string | boolean => {
  if (isEmpty(value)) return true

  let regeX = regex
  if (typeof regeX === 'string') regeX = new RegExp(regeX)

  if (Array.isArray(value)) return value.every((val) => regexValidator(val, regeX))

  return regeX.test(String(value)) || "The input doesn't match the expected format"
}

// 👉 Alpha Validator
export const alphaValidator = (value: string) => {
  if (isEmpty(value)) return true

  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

// 👉 URL Validator
export const urlValidator = (value: string) => {
  if (isEmpty(value)) return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/

  return re.test(String(value)) || 'URL is invalid'
}

// 👉 Length Min Validator
export const lengthMinValidator = (value: string, length: number) => {
  if (isEmpty(value)) return true

  return (
    String(value).length >= length ||
    `The Min Character field must be at least ${length} characters`
  )
}

// 👉 Length Max Validator
export const lengthMaxValidator = (value: string, length: number) => {
  if (isEmpty(value)) return true

  return (
    String(value).length <= length ||
    `The Min Character field must be at maximum ${length} characters`
  )
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: string) => {
  if (isEmpty(value)) return true

  const valueAsString = String(value)

  return (
    /^[0-9A-Z_-]*$/i.test(valueAsString) ||
    'The input must be alphanumeric and can only include dashes (-) and underscores (_).'
  )
}

// 👉 Image Validator
export const imageValidator = (value: FileList) => {
  if (!value || value.length === 0) return true

  return value[0].size < 2000000 || 'Image size should be less than 2 MB'
}
