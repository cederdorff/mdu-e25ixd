import re
from html.parser import HTMLParser

class IDCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for k, v in attrs:
            if k == "id":
                self.ids.add(v)

with open("slides/product-optimization-01/index.html", "r", encoding="utf-8") as f:
    content = f.read()

collector = IDCollector()
collector.feed(content)

print("Collected IDs:")
print(sorted(list(collector.ids)))

