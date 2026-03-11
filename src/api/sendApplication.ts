type sendApplicationBody = {
  firstName: string;
  lastName: string;
};

export const sendApplication = async ({
  firstName,
  lastName,
}: sendApplicationBody) => {
  return await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    body: JSON.stringify({
      title: firstName + ' ' + lastName,
    }),
  }).then((res) => res.json());
};
