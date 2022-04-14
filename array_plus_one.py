import sys

# # method 4
an_array = sys.argv[1]
an_array_split = an_array.split(',')
return_array = []
for i in an_array_split:
    return_array.append(int(i) + 1)

print(return_array)


