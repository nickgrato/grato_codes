'use client'

import { ChangeEvent } from 'react'
import { Input, Button } from '@mozilla/lilypad-ui'

type PromptInputPropsT = {
  name: string
  value: string
  onNameChange: (value: string) => void
  onValueChange: (value: string) => void
  onDelete: () => void
}

const PromptInput = ({
  name,
  value,
  onNameChange,
  onValueChange,
  onDelete,
}: PromptInputPropsT) => {
  return (
    <div className="flex-align-center gap-12 mb-12">
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onNameChange(e.target.value)
        }}
        value={name}
        name="name"
        placeholder="Input Name"
        label="input name"
        required={true}
        showLabel={false}
      />
      <div className="mb-12">:</div>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onValueChange(e.target.value)
        }}
        value={value}
        name="value"
        placeholder="Input Value"
        label="input value"
        required={true}
        showLabel={false}
      />
      <div>
        <Button
          icon="trash"
          category="primary_clear"
          classProp="mb-12"
          onClick={onDelete}
        />
      </div>
    </div>
  )
}

export default PromptInput
