import Service from '../../utils/http';
import { useEffect, useState } from 'react';
import { Avatar, Card, Container, Stack, Text } from '@mantine/core';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        (async () => {
            try {
                setError('');
                const response = await service.get('user/me');

                // Some endpoints return `{ data: ... }` while others return the object directly.
                const payload = response?.data ?? response;

                // Guard against accidentally receiving HTML (e.g. SPA fallback on bad API route).
                if (typeof payload === 'string') {
                    throw new Error('Invalid response from server');
                }

                setUser(payload);
            } catch (error) {
                console.error("Error", error);
                setUser(null);
                setError(error?.response?.data?.message ?? error?.message ?? 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading) {
        return (
            <Container>
                <Text>Loading</Text>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Text c="red">{error}</Text>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container>
                <Text>No user found.</Text>
            </Container>
        );
    }

    return (
        <Container size="sm" py="xl">
            <Card withBorder radius="md" p="xl">
                <Stack align="center" justify="center" gap="sm">
                    <Avatar src={user?.avatar} size={140} radius={999} alt={user?.name ? `${user.name} avatar` : 'User avatar'} />
                    <Text fw={600} size="lg">{user?.name || 'Unnamed user'}</Text>
                    <Text c="dimmed">{user?.email || 'No email on file'}</Text>
                    <Text c="dimmed" size="sm">
                        {user?.createdAt ? `Joined ${new Date(user.createdAt).toLocaleDateString()}` : ''}
                    </Text>
                </Stack>
            </Card>
        </Container>
    );
}