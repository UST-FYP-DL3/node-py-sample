import sys
import json

# method 3
num_dict = json.loads(sys.argv[1])
for k,v in num_dict.items():
    num_dict[k] = v+1

print(json.dumps(num_dict))


