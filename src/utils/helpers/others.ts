// 👉 Avatar Text Initials
export const getAvatarText = (name: string) => {
  const nameParts = name.trim().split(' ').filter(Boolean)

  const initials = nameParts.slice(0, 2).map((part) => part[0].toUpperCase())

  return initials.join('')
}

// 👉 Slug Name
export const getSlugText = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 23)
}

// 👉 Money Format Text
export const getMoneyText = (value: number) => {
  if (isNaN(value)) return '₱0.00'

  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// 👉 Precise Number
export const getPreciseNumber = (value: number): number => {
  return Math.round(value * 100) / 100
}

// 👉 Alpha-numeric Random Code
export const getRandomCode = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join(
    '',
  )
}

// 👉 Pad String Left
export const getPadLeftText = (value: string | number, length = 4, char = '0') => {
  value = String(value)
  if (value.length >= length) return value
  return char.repeat(length - value.length) + value
}

// 👉 File Extraction of Object, for 1 File/Image
export const fileExtract = (event: Event): Promise<{ fileObject: File; fileUrl: string }> => {
  return new Promise((resolve, reject) => {
    const { files } = event.target as HTMLInputElement

    if (!files || !files.length || files.length === 0) return reject(new Error('No files selected'))

    const fileReader = new FileReader()
    fileReader.readAsDataURL(files[0])

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        resolve({ fileObject: files[0], fileUrl: fileReader.result })
      else reject(new Error('Failed to read file as Data URL'))
    }

    fileReader.onerror = () => reject(new Error('Error reading file'))
  })
}

// 👉 File Extraction of Object, for Multiple Files/Images
export const filesExtract = (event: Event): Promise<{ fileObject: File[]; fileUrl: string[] }> => {
  return new Promise((resolve, reject) => {
    const { files } = event.target as HTMLInputElement

    if (!files || !files || files.length === 0) {
      return reject(new Error('No files selected'))
    }

    const fileObject = Array.from(files)
    const fileReaders = fileObject.map(
      (file) =>
        new Promise<{ fileObject: File; fileUrl: string }>((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)

          fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
              resolve({ fileObject: file, fileUrl: fileReader.result })
            } else {
              reject(new Error('Failed to read file as Data URL'))
            }
          }

          fileReader.onerror = () => reject(new Error('Error reading file'))
        }),
    )

    Promise.all(fileReaders)
      .then((results) => {
        const fileUrl = results.map((result) => result.fileUrl)
        resolve({ fileObject, fileUrl })
      })
      .catch((error) => reject(error))
  })
}

// 👉 Generate CSV
export const generateCSV = (filename: string, csvData: string) => {
  const blob = new Blob([csvData], { type: 'text/csv; charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')

  link.href = url
  link.setAttribute('download', `${filename}.csv`)

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  link.remove()

  URL.revokeObjectURL(url)
}

// 👉 CSV Text Trimming
export const generateCSVTrim = (string: string) => {
  if (typeof string !== 'string' || !string.trim()) return ''

  return string.replace(/,/g, ' ').replace(/\s+/g, ' ').trim()
}

// 👉 Parse Object Trimming
export const objectValueTrim = (string: string) => {
  if (typeof string !== 'string' || !string.trim()) return ''

  return string.replace(/\s+/g, ' ').trim()
}
