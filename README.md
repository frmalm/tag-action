# Tag Branch - Javascript Action

Action creates tag on a branch with specified prefix and number sequence.

## Inputs

### `prefix`

**Required** The name of the person to greet. Default `"v"`. 

Example: v => v10.1 or tag-action-v => tag-action-v1.3

### `major`

**Required** Major release version for the sequence.

Example: 10 => v10.1 or 2 => v2.34

### `minor`

**Required** Minor version to start sequence at. Default `"0"`.

Example: 2 => v1.2 or 113 => v2.113

### `token`

**Required** Token for accessing repository.

## Example usage

```yaml
name: Tag main branch with my-repo-v11.x
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: frmalm/tag-action@v1.1
        with:  
          prefix: my-repo-v
          major: 11
          token: ${{ secrets.GIT_HUB_TOKEN }}
```
