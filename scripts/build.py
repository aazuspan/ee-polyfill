from jsmin import jsmin
import os


compile_files = [
    os.path.join("src", "array"),
    os.path.join("src", "math"),
    os.path.join("src", "number"),
    os.path.join("src", "string"),
]

for file in compile_files:
    with open(file, "r") as src:
        fname = os.path.basename(file)
        out_path = os.path.join("min", fname + ".min.js")
        with open(out_path, "w") as dst:
            dst.write(jsmin(src.read()))