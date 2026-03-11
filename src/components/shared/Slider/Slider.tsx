import { Slider as MantineSlider } from '@mantine/core';

export interface SliderProps extends Omit<
  React.ComponentProps<typeof MantineSlider>,
  'value'
> {
  value: number;
  labelText: string;
}

export const Slider = ({ labelText, ...props }: SliderProps) => {
  return (
    <div>
      <span>{labelText}</span>
      <MantineSlider
        styles={{
          bar: {
            backgroundColor: 'var(--color-primary)',
          },
          thumb: {
            borderColor: 'var(--color-primary-30)',
          },
        }}
        {...props}
      />
    </div>
  );
};
