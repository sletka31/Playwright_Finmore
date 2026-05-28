export const getAuthHeaders = () => {
    const username = process.env.WP_USERNAME || 'admin';
    const password = process.env.WP_PASSWORD || 'Engineer_123';

    return {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Content-Type': 'application/json'
    };
};