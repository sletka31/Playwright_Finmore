export class DataGenerator {

    static generatePostTitle(): string {

        const topics = [
            'How to Improve API Test Automation',
            'Top Playwright Testing Strategies in 2026',
            'Best Practices for REST API Validation',
            'Why End-to-End Testing Matters',
            'Complete Guide to API Security Testing',
            'Advanced Playwright Techniques for QA Engineers',
            'How to Build a Stable Automation Framework',
            'Common Mistakes in Automated Testing',
            'Performance Testing Tips for Modern Applications',
            'GraphQL vs REST API Testing Comparison',
            'How Companies Scale QA Automation',
            'CI/CD Integration for Automated Tests',
            'Effective Bug Reporting for QA Teams',
            'Test Data Management in Automation',
            'Senior QA Engineer Career Roadmap'
        ];

        return topics[
            Math.floor(Math.random() * topics.length)
        ];

    }

    static generatePostContent(): string {

        const paragraphs = [
            `Modern software development requires high-quality automated testing processes. Teams that invest in reliable automation frameworks can significantly reduce regression issues and improve release stability.`,

            `Playwright has become one of the most popular tools for end-to-end testing because of its speed, stability, and cross-browser support. Many QA engineers prefer it for modern web applications.`,

            `API automation testing allows teams to validate backend functionality faster than manual testing. Proper validation of status codes, response schemas, headers, and business logic is critical.`,

            `A strong automation framework should include reusable utilities, clean architecture, logging, reporting, and proper error handling. These practices simplify long-term maintenance.`,

            `Performance testing is essential for understanding how systems behave under load. Slow API responses may indicate database bottlenecks, inefficient queries, or infrastructure limitations.`,

            `Continuous Integration and Continuous Delivery pipelines help teams execute automated tests on every commit. This approach reduces deployment risks and improves software quality.`,

            `Senior QA engineers focus not only on finding bugs but also on improving processes, mentoring teams, and optimizing testing strategies for business goals.`,

            `Security testing is becoming increasingly important for web applications. Authentication, authorization, and sensitive data validation should always be covered by automated tests.`,

            `Well-structured test data improves reliability and reduces flaky test behavior. Dynamic data generation helps avoid conflicts between test executions.`,

            `Modern QA teams combine UI testing, API testing, contract testing, and performance testing to achieve comprehensive quality assurance coverage.`
        ];

        const shuffled = [...paragraphs]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        return shuffled.join('\n\n');

    }
    static generatePostExcerpt(): string {
        const excerpt = [
            'How to Improve API Test Automation',
            'Top Playwright Testing Strategies in 2026',
            'Best Practices for REST API Validation',
            'Why End-to-End Testing Matters',

        ];
        return excerpt[
            Math.floor(Math.random() * excerpt.length)
        ];
    }
}