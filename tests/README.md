# Testing Guide

This directory contains end-to-end tests for the blog using Playwright.

## Test Files

- **`navigation.spec.js`** - Tests navigation functionality
- **`homepage.spec.js`** - Tests homepage content and styling
- **`blog.spec.js`** - Tests blog listing and individual post pages
- **`tags.spec.js`** - Tests tag system functionality
- **`api.spec.js`** - Tests API endpoints

## Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/navigation.spec.js
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
```

## Test Coverage

The tests cover:
- ✅ Navigation between pages
- ✅ Homepage content and styling
- ✅ Blog post listing and individual posts
- ✅ Tag system (overview and filtered views)
- ✅ API endpoints
- ✅ Responsive design
- ✅ User interactions

## Adding New Tests

When adding new features, create corresponding test files following the naming convention:
- `feature-name.spec.js`

Test files should:
- Use descriptive test names
- Test both happy path and edge cases
- Check for accessibility and responsive design
- Include API tests when applicable 