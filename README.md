# Tag Branch - Javascript Action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `prefix`

The name of the person to greet. Default `"v"`. 

Example: v => v10.1 or tag-action-v => tag-action-v1.3

### `major`

**Required** Major release version for the sequence.

Example: 10 => v10.1 or 2 => v2.34

### `token`

**Required** Token for accessing repository.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
name: Tag main branch with my-repo-v10.x
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: frmalm/tag-action@v1.1.1
        with:  
          prefix: my-repo-v
          major: 11
          token: ${{ secrets.GIT_HUB_TOKEN }}
```