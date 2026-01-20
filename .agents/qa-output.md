# QA Tester Audit Report

**Project:** BrightByte (zarubin_site)
**Date:** 2025-01-20
**Branch:** audit/full-site-review-2025-01-20

---

## Executive Summary

Найдено **15 багов** и **15 issues**. Критические проблемы: открытый Telegram bot token в клиентском коде, отсутствие валидации форм, и проблемы с гидратацией.

---

## 🔴 CRITICAL BUGS

### BUG #1: Telegram Bot Token в клиентском коде

**Locations:**
- `src/components/Main/ContactForm/Form/Form.tsx:21`
- `src/components/BriefClient/BriefClient.tsx:41`
- `app/regfo/results/page.tsx:236`

**Problem:** Токен бота жёстко прописан в клиентском коде:
```
https://api.telegram.org/bot6992822983:AAHWVJuwqeVl5kscHuZwcPx5W-IPXJ7mpkk/sendMessage
```

**Impact:**
- Токен виден в browser console/network
- Бот может быть захвачен
- Открыт для спама и abuse

**Fix:** Перенести на backend API route с rate limiting.

---

### BUG #2: Нет валидации в Contact Form

**Location:** `src/components/Main/ContactForm/Form/Form.tsx`

**Problem:** Formik без validationSchema:
```typescript
const formik = useFormik({
  initialValues: { name: '', email: '', phone: '', details: '' },
  onSubmit: async (values) => { ... },
  // Missing: validationSchema
});
```

**Impact:**
- Невалидные email отправляются
- Можно отправить пустую форму
- Нет сообщений об ошибках

---

### BUG #3: Silent Error Handling

**Location:** `src/utils/sendEmail.ts:23-25`, `src/utils/sendBrief.ts:29-31`

```typescript
catch (error) {
  console.log(error);  // Только в консоль, без уведомления
}
```

**Impact:** Пользователь думает что форма отправлена, но она failed.

---

### BUG #7: Нет Input Validation в API Routes

**Location:** `app/api/send/route.ts`, `app/api/briefsend/route.ts`

**Problem:** Данные используются без санитизации:
```typescript
html: '<h1>Name: ' + response.name + '</h1>'
```

**Impact:** HTML injection, XSS в email-ах.

---

## 🟡 MEDIUM BUGS

### BUG #4: Regfo Assessment - Skip Validation

**Location:** `app/regfo/assessment/page.tsx:654-664`

Можно пропустить вопросы после 15 ответов — incomplete assessment считается full.

---

### BUG #5: localStorage State Race Condition

**Location:** `src/components/Contexts/QuestionContext.tsx`

Двойная инициализация state → flash пустого контента при refresh.

---

### BUG #6: Hydration Mismatch в Regfo Results

**Location:** `app/regfo/results/page.tsx:354-358`

Server рендерит "No Results Found", client показывает данные из localStorage.

---

### BUG #10-11: Regfo State Logic

- Preview stage jump → может показать неправильный вопрос
- Quick answers не считаются в full assessment validation

---

### BUG #14: PDF Text Truncation

**Location:** `app/regfo/results/page.tsx:487`

Только первая строка вопроса используется в PDF:
```typescript
pdf.text(questionLines[0], ...);  // Обрезает остальные строки
```

---

## 🟢 LOW ISSUES

### BUG #9: /test page в production

Iframe тестовая страница доступна публично, не responsive.

---

## Accessibility Issues

| Issue | Severity | Location |
|-------|----------|----------|
| Missing form labels | HIGH | Contact Form, Brief Form |
| No aria-labels on buttons | MEDIUM | Regfo assessment |
| Mobile menu keyboard trap | MEDIUM | MobileMenu.tsx |
| Small touch targets | MEDIUM | Form buttons |

---

## Form Testing Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| Submit invalid email | ❌ FAIL | No validation |
| Submit empty form | ❌ FAIL | No required fields |
| Network error handling | ❌ FAIL | No user feedback |
| Double-click submit | ❌ FAIL | Multiple submissions possible |
| XSS in name field | ❌ FAIL | HTML injection |

---

## Priority Fixes

### P0 (Immediate)
1. Move Telegram token to backend
2. Add form validation (Yup/Zod)
3. Add input sanitization
4. Add error feedback to users

### P1 (This week)
5. Fix Regfo skip validation
6. Fix hydration issues
7. Add loading states to forms
8. Fix PDF text wrapping

### P2 (Later)
9. Add form labels for accessibility
10. Increase touch targets
11. Add E2E tests

---

## Next Agent Notes

**For SEO Writer:**
- Проверить meta tags на новых страницах (/regfo)
- Убедиться в консистентности titles
- Проверить что error pages имеют правильные noindex

**For Marketing:**
- Forms теряют конверсии из-за silent failures
- Regfo tool может показывать неполные результаты
- Accessibility issues могут отталкивать enterprise клиентов
