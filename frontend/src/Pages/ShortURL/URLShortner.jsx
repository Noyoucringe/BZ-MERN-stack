import { Button, Stack, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import Service from '../../utils/http';

const URLShortner = () => {
  const service = new Service();
  const [data, setData] = useState({});
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await service.post('s', data);
      console.log(response);
      setShortUrl(response.shortCode);
    } catch (error) {
      console.error('Error creating short URL:', error.message);
    }
  };

  useEffect(() => {
    console.log(`Short URL: ${shortUrl}`);
  }, [shortUrl]);

  return (
    <>
      {shortUrl && shortUrl.length > 0 ? (
        <p>
          Short URL: {`https://url-shortener-bootcamp.onrender.com/api/s/${shortUrl}`}
        </p>
      ) : (
        <Stack>
          <TextInput
            size="md"
            label="Original URL"
            placeholder="Input placeholder"
            onChange={(event) => {
              setData({ ...data, originalUrl: event.target.value });
            }}
          />
          <TextInput
            size="md"
            label="Customize your link ( Optional )"
            placeholder="Input placeholder"
            onChange={(event) => {
              setData({ ...data, customUrl: event.target.value });
            }}
          />
          <TextInput
            size="md"
            label="Title ( Optional )"
            placeholder="Input placeholder"
            onChange={(event) => {
              setData({ ...data, title: event.target.value });
            }}
          />
          <Button variant="outline" size="md" onClick={handleSubmit}>
            Generate And Shorten URL
          </Button>
        </Stack>
      )}
    </>
  );
};

export default URLShortner;