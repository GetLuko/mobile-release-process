# @getluko/mobile-release-process

Scripts to automate git flow used by our mobile team when releasing.

<img src="./docs/git_flow.png" width="1000"  />

The `mobile-release-process` command will:
- Ask you several questions to be sure that you can start the release
- Check the next app version number
- Prepare the master branch
- Push the branch to build the next alpha
- Prepare the next release
- Clean up the temporary branch


## Configuration

1. Install the package:

```
yarn add @getluko/mobile-release-process --dev
```

2. Disclaimer: you need to edit `src/configuration.ts` to reflet your project file

We think about making this configuration dynamic on a next iteration if needed.

3. Run the script
```
npx mobile-release-process
```

## Next steps

- [ ] Support patch release
- [ ] Externalize changelog depdendency
- [ ] Make git branch configuration dynamic
- [ ] Create alpha branch locally if not exist
- [ ] Export individual script for bump
