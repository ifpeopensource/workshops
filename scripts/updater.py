import os, json

def main():
    repo = os.getenv("repo")
    reporl = repo.replace(" ", "%20")
    assignees = json.loads(os.getenv("assignees"))
    _readme = open("README.md", "a")

    contributorsList = []
    for assignee in assignees:
        login = assignee.get("login")
        url = assignee.get("html_url")
        s = f"[@{login}]({url})"
        contributorsList.append(s)
    
    contributorsString = ", ".join(contributorsList)

    string = f"\n### [{repo}](https://github.com/ifpeopensource/workshops/tree/main/{reporl}), com {contributorsString}"
    _readme.write(string)
    _readme.close()

if __name__ == "__main__":
    main()    