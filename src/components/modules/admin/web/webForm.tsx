"use client"

import type { Setup } from "@/lib/interface/admin/get-webSetting"
import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Save } from "lucide-react"

import { Button } from "@/components/atoms/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import { toast } from "@/components/atoms/use-toast"
import { Skeleton } from "@/components/atoms/skeleton"
import { ImageUploadField } from "./image-upload-field"

export interface WebFormProps {
  setup?: Setup
  onSubmit?: (data: Setup, files?: { logo?: File; favicon?: File }) => void
}

export function WebForm({ setup, onSubmit }: WebFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)

  // Use Setup as the form type, not WebFormProps
  const form = useForm<Setup>({
    defaultValues: setup || {
      id: "",
      name: "",
      tagline: "",
      description: "",
      logo: "",
      favicon: "",
      email: "",
      phone: "",
      address: "",
      social_facebook: "",
      social_instagram: "",
      social_tiktok: "",
      social_twitter: "",
      social_linkedin: "",
      social_youtube: "",
      social_whatsapp: "",
      link_video: "",
      tax_rate: 0,
    },
    mode: "onChange",
  })

  // Update form when setup changes
  useEffect(() => {
    if (setup) {
      console.log("Resetting form with setup data:", setup)
      form.reset(setup)
    }
  }, [setup, form])

  console.log("Current setup:", setup)
  console.log("Current form values:", form.getValues())

  async function handleSubmit(data: Setup) {
    setIsSubmitting(true)
    try {
      // Call the onSubmit callback if provided
      if (onSubmit) {
        const files = {
          ...(logoFile && { logo: logoFile }),
          ...(faviconFile && { favicon: faviconFile }),
        }

        // Only pass files object if there are files
        if (Object.keys(files).length > 0) {
          await onSubmit(data, files)
        } else {
          await onSubmit(data)
        }
      }

      toast({
        title: "Settings saved",
        description: "Your website settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle logo file or URL changes
  const handleLogoChange = (value: string | File) => {
    if (typeof value === "string") {
      form.setValue("logo", value)
      setLogoFile(null)
    } else {
      // Keep the existing URL in the form, but store the file for upload
      setLogoFile(value)
    }
  }

  // Handle favicon file or URL changes
  const handleFaviconChange = (value: string | File) => {
    if (typeof value === "string") {
      form.setValue("favicon", value)
      setFaviconFile(null)
    } else {
      // Keep the existing URL in the form, but store the file for upload
      setFaviconFile(value)
    }
  }

  // Show loading state if setup is not available yet
  if (!setup) {
    return (
      <div className="container px-4 pb-8 pt-8 sm:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-2 h-4 w-full max-w-md" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 pb-8 pt-8 sm:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Website Settings</h1>
        <p className="mt-2 text-gray-600">Configure your website information and appearance.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Configure the basic information about your website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{
                      required: "Site name is required",
                      minLength: {
                        value: 2,
                        message: "Site name must be at least 2 characters.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your site name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name that will appear in the browser tab and search results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    rules={{
                      required: "Tagline is required",
                      minLength: {
                        value: 2,
                        message: "Tagline must be at least 2 characters.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input placeholder="Your site tagline" {...field} />
                        </FormControl>
                        <FormDescription>A short phrase that describes your site.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    rules={{
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your site" className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormDescription>This description will be used for SEO purposes.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>Configure your site's logo and favicon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Controller
                    control={form.control}
                    name="logo"
                    rules={{
                      required: "Logo is required",
                    }}
                    render={({ field, fieldState }) => (
                      <ImageUploadField
                        label="Logo"
                        value={field.value}
                        onChange={handleLogoChange}
                        placeholder="https://example.com/logo.png"
                        description="Upload your site's logo image or provide a URL."
                        required={true}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="favicon"
                    rules={{
                      required: "Favicon is required",
                    }}
                    render={({ field, fieldState }) => (
                      <ImageUploadField
                        label="Favicon"
                        value={field.value}
                        onChange={handleFaviconChange}
                        placeholder="https://example.com/favicon.ico"
                        description="Upload your site's favicon (browser tab icon) or provide a URL."
                        required={true}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Configure your contact details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 6,
                        message: "Please enter a valid phone number.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    rules={{
                      required: "Address is required",
                      minLength: {
                        value: 5,
                        message: "Address must be at least 5 characters.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Main St, City, Country" className="min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Configure your social media links.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="social_facebook"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input placeholder="https://facebook.com/yourpage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="social_instagram"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/yourpage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="social_tiktok"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TikTok</FormLabel>
                          <FormControl>
                            <Input placeholder="https://tiktok.com/@yourpage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="social_twitter"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitter.com/yourpage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="social_linkedin"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="social_youtube"
                      rules={{
                        pattern: {
                          value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Please enter a valid URL.",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youtube.com/yourchannel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="social_whatsapp"
                    rules={{
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: "Please enter a valid URL.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="https://wa.me/1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Settings</CardTitle>
                  <CardDescription>Configure additional site settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="link_video"
                    rules={{
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: "Please enter a valid URL.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/video" {...field} />
                        </FormControl>
                        <FormDescription>URL to a promotional or instructional video.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tax_rate"
                    rules={{
                      required: "Tax rate is required",
                      min: {
                        value: 0,
                        message: "Tax rate must be at least 0.",
                      },
                      max: {
                        value: 1,
                        message: "Tax rate must be at most 1.",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            placeholder="0.11"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                            value={field.value}
                          />
                        </FormControl>
                        <FormDescription>Tax rate as a decimal (e.g., 0.11 for 11%).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Configuration
                </span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
