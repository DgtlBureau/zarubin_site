export const sendEmail = async (
  name: string,
  email: string,
  phone?: string,
  description?: string,
  cv?: File,
) => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        ...(phone ? { phone } : {}),
        ...(description ? { description } : {}),
        ...(cv ? { cv } : {}),
      }),
    });
    console.log('Email sent successfully:', await response.json());
  } catch (error) {
    console.log(error);
  }
};
