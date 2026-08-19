with open("slides/product-optimization-01/index.html", "r", encoding="utf-8") as f:
    content = f.read()

from html.parser import HTMLParser

class AgendaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_agenda = False
        self.tags = []
        self.links = []
        self.current_href = None
        self.buffer = ""

    def handle_starttag(self, tag, attrs):
        self.tags.append(tag)
        attrs_dict = dict(attrs)
        if tag == "section" and attrs_dict.get("id") == "agenda":
            self.in_agenda = True
        if self.in_agenda:
            if tag == "a" and "href" in attrs_dict:
                self.current_href = attrs_dict["href"]
                self.buffer = ""

    def handle_endtag(self, tag):
        if self.tags:
            self.tags.pop()
        if self.in_agenda:
            if tag == "a" and self.current_href:
                self.links.append((self.current_href, self.buffer.strip()))
                self.current_href = None
            if tag == "section" and len([t for t in self.tags if t == "section"]) == 0:
                self.in_agenda = False

    def handle_data(self, data):
        if self.in_agenda and self.current_href is not None:
            self.buffer += data

parser = AgendaParser()
parser.feed(content)

for href, txt in parser.links:
    print(f"Agenda Item: href='{href}', text='{txt}'")

