import re

with open("slides/product-optimization-01/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find sections that have "Agenda" or "Oversigt" or list items with hrefs
# We can print sections that contain links with href starting with '#'
from html.parser import HTMLParser

class SectionPrinter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_section = False
        self.section_depth = 0
        self.section_content = []
        self.sections_html = []

    def handle_starttag(self, tag, attrs):
        if tag == "section":
            if self.in_section:
                self.section_depth += 1
            else:
                self.in_section = True
                self.section_depth = 1
                self.sections_html.append([])
        if self.in_section:
            attrs_str = " ".join([f'{k}="{v}"' for k, v in attrs])
            self.sections_html[-1].append(f"<{tag} {attrs_str}>")

    def handle_endtag(self, tag):
        if self.in_section:
            self.sections_html[-1].append(f"</{tag}>")
            if tag == "section":
                self.section_depth -= 1
                if self.section_depth == 0:
                    self.in_section = False

    def handle_data(self, data):
        if self.in_section:
            self.sections_html[-1].append(data)

parser = SectionPrinter()
parser.feed(content)

for s in parser.sections_html:
    full_str = "".join(s)
    if "agenda" in full_str.lower() or "oversigt" in full_str.lower():
        print("--- Slide Match ---")
        # limit size
        print(full_str[:1500])
        print("-------------------\n")

