import { Button, Select, Typography } from 'src/components/shared';
import { Input } from 'src/components/shared/Input';

export const PersonalDataPage = () => {
  return (
    <div>
      <Button className="px-2">123</Button>
      <Button disabled className="px-2">
        123
      </Button>
      <Button variant="secondary" className="px-2">
        123
      </Button>

      <Input value={'123'} onChange={() => {}} format={(value) => value} isValid={() => false} />

      <Typography variant="h1">123</Typography>
      <Typography variant="h2">123</Typography>
      <Typography variant="h3">123</Typography>
      <Typography variant="body">123</Typography>
      <Typography variant="body-sm">123</Typography>
      <Typography variant="caption">123</Typography>

      <Typography variant="h1" as="h1" color="danger">
        123
      </Typography>
      <Typography variant="h2">123</Typography>
      <Typography variant="h3">123</Typography>
      <Typography variant="body">123</Typography>
      <Typography variant="body-sm">123</Typography>
      <Typography variant="caption">123</Typography>

      <Select
        value={''}
        onChange={(value) => value}
        options={[
          { label: '123', value: '123' },
          { label: '312', value: '312' },
        ]}
      />
    </div>
  );
};
