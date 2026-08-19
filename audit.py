import re
from html.parser import HTMLParser

class SlidesAuditor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []          # List of (tag, attrs, id_attr)
        self.links = []             # List of (href, text_buffer)
        self.current_tags = []
        self.current_tag_attrs = {}
        self.collecting_text_for_link = False
        self.link_text_buffer = ""

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tags.append(tag)
        
        if tag == "section":
            sid = attrs_dict.get("id")
            self.sections.append((tag, attrs_dict, sid))
            
        if tag == "a":
            href = attrs_dict.get("href")
            if href:
                self.collecting_text_for_link = True
                self.link_text_buffer = ""
                self.current_link_href = href

    def handle_endtag(self, tag):
        if self.current_tags:
            self.current_tags.pop()
        if tag == "a" and self.collecting_text_for_link:
            self.links.append((self.current_link_href, self.link_text_buffer.strip()))
            self.collecting_text_for_link = False

    def handle_data(self, data):
        if self.collecting_text_for_link:
            self.link_text_buffer += data

# Load HTML content
html_path = "slides/product-optimization-01/index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

parser = SlidesAuditor()
parser.feed(html_content)

print("--- 1. Unique Section IDs Audit ---")
section_ids = [sid for _, _, sid in parser.sections if sid]
all_documented_ids = set()
# Let's extract all 'id' attributes from the html we can find using regex or complete html parser
import re
id_pattern = re.compile(r'id=["\']([^"\']+)["\']')
all_ids_in_doc = id_pattern.findall(html_content)
all_ids_set = set(all_ids_in_doc)

section_id_counts = {}
for sid in section_ids:
    section_id_counts[sid] = section_id_counts.get(sid, 0) + 1

duplicate_ids = {k: v for k, v in section_id_counts.items() if v > 1}
if duplicate_ids:
    print(f"DUPLICATE SECTION IDs FOUND: {duplicate_ids}")
else:
    print("All section IDs are unique.")

print("\n--- 2. Agenda Task Links #opgave-1 through #opgave-9 ---")
for i in range(1, 10):
    expected_id = f"opgave-{i}"
    count = section_ids.count(expected_id)
    print(f"ID '{expected_id}': found {count} time(s) in sections")

print("\n--- 3. Agenda Content and order (task numbers 1-9) ---")
# Let's locate the slides with 'agenda'
# We can find sections or list elements that look like the agenda.
# Let's search inside the HTML for index of elements with "agenda" or let's print links with 'opgave' in href
agenda_links = [l for l in parser.links if "opgave" in l[0]]
for index, l in enumerate(agenda_links, 1):
    print(f"  Opgave Link {index}: text='{l[1]}', href='{l[0]}'")

print("\n--- 4. Internal href resolutions (href='#/...' or href='#...') ---")
for href, text in parser.links:
    if href.startswith('#'):
        target = href
        cleaned_target = href.lstrip('#').lstrip('/')
        # Check if indices like digits, e.g., "1/2" or "3"
        is_index = re.match(r'^\d+(/\d+)*$', cleaned_target)
        if not is_index and cleaned_target not in all_ids_set:
            print(f"Internal link '{href}' (text: '{text}') - Target not found as element ID")
else:
    print("Checked internal links.")

print("\n--- 5. External Hrefs and Malformed URLs Audit ---")
import urllib.parse
for href, text in parser.links:
    if not href.startswith('#'):
        parsed = urllib.parse.urlparse(href)
        is_malformed = False
        if not parsed.scheme or parsed.scheme not in ["http", "https", "mailto", "tel"]:
            # If it doesn't look like a standard path/protocol
            if not href.startswith(".") and not href.startswith("/"):
                is_malformed = True
        print(f"  External/Other Link: href='{href}', text='{text}', Malformed?: {is_malformed}")

