import Service from '../../utils/http';
import { useEffect, useState } from 'react';
import { Avatar, Container, Stack, Text } from '@mantine/core';
export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await service.get("user/Profile");
            setUser(response);
        } catch (error) {
            console.error("Error", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(
        () => { fetchUser() }, []
    );
    if (loading) {
        return (
            <Container>
                <Text>Loading</Text>
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
        <Container>
            <Stack
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
            >
                <Avatar src={user?.avatar} size={150} radius={150} alt="it's me" />
                <Text> {user?.name}</Text>
                <Text> {user?.email}</Text>
                <Text> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</Text>
            </Stack>
        </Container>

    );
}