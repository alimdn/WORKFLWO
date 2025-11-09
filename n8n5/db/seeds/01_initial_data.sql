-- Seed file with initial data for development

-- Create admin user
INSERT INTO users (id, name, email, password_hash, role, referral_code, created_at, verified_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Admin User', 'admin@example.com', '$2b$10$example_hash', 'admin', 'ADMIN001', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'Test User', 'user@example.com', '$2b$10$example_hash', 'user', 'USER001', NOW(), NOW());

-- Create sample products
INSERT INTO products (id, title, slug, description, price_cents, currency, is_paid, images, download_url, stock, category, rating_avg, created_at)
VALUES 
  ('33333333-3333-3333-3333-333333333333', 'E-Book: Mastering Web Development', 'ebook-mastering-web-dev', 'Comprehensive guide to modern web development techniques', 2999, 'USD', true, '["/images/ebook1.jpg"]', 'https://example.com/downloads/ebook1.pdf', 100, 'Digital', 4.5, NOW()),
  ('44444444-4444-4444-4444-444444444444', 'Online Course: JavaScript Fundamentals', 'course-js-fundamentals', 'Beginner-friendly course covering JavaScript basics', 9999, 'USD', true, '["/images/course1.jpg"]', 'https://example.com/downloads/course1.zip', 50, 'Digital', 4.8, NOW()),
  ('55555555-5555-5555-5555-555555555555', 'Premium Plugin: Advanced Analytics', 'plugin-advanced-analytics', 'Powerful analytics plugin for your website', 14999, 'USD', true, '["/images/plugin1.jpg"]', 'https://example.com/downloads/plugin1.zip', 25, 'Plugins', 4.2, NOW());

-- Create sample discounts
INSERT INTO discounts (id, code, type, amount, starts_at, expires_at, usage_limit, per_user_limit, created_at)
VALUES 
  ('66666666-6666-6666-6666-666666666666', 'WELCOME10', 'percentage', 10, NOW(), NOW() + INTERVAL '30 days', 100, 1, NOW()),
  ('77777777-7777-7777-7777-777777777777', 'SAVE20', 'percentage', 20, NOW(), NOW() + INTERVAL '15 days', 50, 1, NOW());