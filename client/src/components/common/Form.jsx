import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';


const Form = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {
  const renderInputField = (control) => {
    const value = formData[control.name] || '';

    switch (control.componentType) {
      case 'input':
      default:
        return (
          <Input
            type={control.type || 'text'}
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
            className="mt-1  "
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => setFormData({ ...formData, [control.name]: val })}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.option?.map((opt) => (
                <SelectItem key={opt.id || opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
        return (
          <Textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
            className="mt-1"
          />
        );

     
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {formControls.map((control, index) => (
        <div key={control.name || index} className="flex flex-col gap-1">
          <Label htmlFor={control.name} className="text-sm font-medium text-gray-700">
            {control.label}
          </Label>
          {renderInputField(control)}
        </div>
      ))}

      <Button type="submit" className={"w-full mt-4 bg-[#616630] py-6 hover:bg-[#414425] cursor-pointer text-2xl"}>
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
