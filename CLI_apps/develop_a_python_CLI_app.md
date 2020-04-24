**Introduction**  

This guide, with some external content, gives you all keys to set up a python CLI app anyone can download from PyPI.  
It's a walkthrough from best practices to package your code up to pushing it to the universal PyPI website.  

## Packaging your code

[Packaging the CLI app code, Medium Article](https://medium.com/@trstringer/the-easy-and-nice-way-to-do-cli-apps-in-python-5d9964dc950d 
)  
[Packaging your code and pushing, Python Documentation](https://packaging.python.org/tutorials/packaging-projects/)   

From there, at the very end, anyone with the source code can download the code.  

**Note on relative paths**  
You should pay careful attention to relative paths so hat anyone can run your code. Eg:  
```
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'relative/path/to/file/you/want')
```  
is a piece of code to get a file in your package. Hardcoding the name of your file will not work.  

### Using `argparse` to pass argument to the app

While building the CLI app, `argparse` will be used to pass your arguments. For instance:  
```
parser = argparse.ArgumentParser(description='Download comics from www.comicextra.com -- Default command with no option ask for your inputs')
parser.add_argument('-c', '--comic', metavar='"Comic Title"', help='download "Comic Title", or ask to input specific chapters if many')
args = parser.parse_args()
```

### Directory structure

```
.
├── LICENSE
├── MANIFEST.in
├── README.md
├── build
│   ├── bdist.macosx-10-x86_64
│   ├── bdist.macosx-10-x86_64
│   └── lib
│       └── your_app
│           ├── __init__.py
│           ├── __main__.py
├── dist
│   ├── your_app-0.1.0.tar.gz
│   └── your_app-0.1.0-py3-none-any.whl
├── your_app
│   ├── __init__.py
│   ├── __main__.py
├── your_app.egg-info
├── install.sh
└── setup.py
```

## Pushing to PyPI

PyPI gathers all code you can download via the `pip install` command.  
There are two separates environment, one for test, and one for production.  

### 1. Writting the `setup.py` script

[Official Doc: Writing the setup script](https://docs.python.org/3/distutils/setupscript.html)  
[One example](https://github.com/jsmits/github-cli/blob/c5b4166976bbf94fc3f929cc369ce094bc02b88e/setup.py)  
[Editing the entry_points param](https://python-packaging.readthedocs.io/en/latest/command-line-scripts.html)  

In the `setup.py`, the below line will give the order to execute the command from the command line:  
```
entry_points = {
        'console_scripts': ['your-app = your_app.__main__:main']}
```  

### 2. Pushing the code to PyPI test

An account is required on [Test PyPI](https://test.pypi.org/account/register/)  

Part I: uploading your code to Test PyPI:  
- `python3 -m pip install --user --upgrade setuptools wheel`
- Update your version accordingly in the `setup.py` file 
- `python3 setup.py sdist bdist_wheel`   
  to build up the /dist directory
- Now twine is required, make sure you have the latest version: `python3 -m pip install --user --upgrade twine`  
- Upload the archives: `python3 -m twine upload --repository testpypi dist/*`
- Fetch properly your token
- Your username is `__token__` and your password is below token
- Now your code is in the test env!  

Part II: downloading your code from Test PyPI:
- You can install it with the command suggested on Test PyPI, eg: `pip install -i https://test.pypi.org/simple/ your-app==0.0.1`
- If all dependencies are installed, should work!


### 3. Pushing the code to PyPI prod

Proceed to the exact same steps as before from [The Official PyPI](https://pypi.org/)  
- `python3 -m twine upload --repository pypi dist/*`  

You will now see your package on the official `PyPI` website;  

